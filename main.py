from fastapi import Body, FastAPI
from gemini_client import get_answer_from_gemini

app = FastAPI()

@app.get("/requests")
def get_my_requests():
    return "Hello, World!"


@app.post("/requests")
def send_prompt(
    prompt: str = Body(embed=True) # body takes a JSON with a "prompt" field             
):
    answer = get_answer_from_gemini(prompt)
    return {"answer": answer}