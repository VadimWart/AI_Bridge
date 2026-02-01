from contextlib import asynccontextmanager
from fastapi import Body, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from db import Base, add_user_requests, engine, get_user_requests
from gemini_client import get_answer_from_gemini


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(engine)

    # all startup code here beforer the yield

    yield


    # all shutdown code here after the yield

app = FastAPI(
    title="AI Bridge",
    lifespan = lifespan
)

@app.get("/requests")
def get_my_requests(request: Request):
    user_ip_address = request.client.host
    print("User IP Address:", user_ip_address)
    user_requests = get_user_requests(ip_address=user_ip_address)
    return user_requests


@app.post("/requests")
def send_prompt(
    request: Request,
    prompt: str = Body(embed=True), # body takes a JSON with a "prompt" field             
):
    user_ip_address = request.client.host
    answer = get_answer_from_gemini(prompt)
    add_user_requests(
        ip_address=user_ip_address,
        prompt=prompt,
        response=answer
    )
    return {"answer": answer}

# CORS settings for local development
app.add_middleware(CORSMiddleware,
    allow_origins=["http://localhost:5500", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)