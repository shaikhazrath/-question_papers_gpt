from PyPDF2 import PdfReader
import os
import uuid
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from dotenv import load_dotenv
import google.generativeai as genai
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)
def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        try:
            pdf_reader = PdfReader(pdf)
            for page in pdf_reader.pages:
                text += page.extract_text() or ""
        except Exception as e:
            print(f"Error reading {pdf}: {e}")
    return text

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks

def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    unique_id = str(uuid.uuid4())
    file_path = f"faiss_index_{unique_id}.index"
    vector_store.save_local(file_path)
    return file_path

def get_conversational_chain():
    prompt_template = """
    the given context is the bunch of previos year questions of exams can you list 10 question from that context that came multiple times in context mention what years that question is present at end  \n\n
    Context:\n {context}\n
    Question: \n{question}\n
    Answer:
    """
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain

def getquestions(getAllquestions,file_path):
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        new_db = FAISS.load_local(file_path, embeddings, allow_dangerous_deserialization=True)
        docs = new_db.similarity_search(getAllquestions)
        chain = get_conversational_chain()
        response = chain({"input_documents": docs, "question": getAllquestions}, return_only_outputs=True)
        return response




def handle_analysis(subject):
    folder_path = f'./uploads/{subject}'
    if not os.path.exists(folder_path):
        print(f"Folder does not exist: {folder_path}")
        return
    pdf_docs = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if f.lower().endswith('.pdf')]
    if not pdf_docs:
        print(f"No PDF files found in folder: {folder_path}")
        return
    
    raw_text = get_pdf_text(pdf_docs)
    text_chunks = get_text_chunks(raw_text)
    file_path = get_vector_store(text_chunks)
    getAllquestions = 'can you list 10 question from that context that came multiple times in context mention what years that question is present at end '
    questions = getquestions(getAllquestions,file_path)
    return questions