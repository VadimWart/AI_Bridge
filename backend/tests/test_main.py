import pytest
from fastapi.testclient import TestClient
from main import app

# Health Check Test api requests
def test_read_main(client):
    response = client.get('/requests')
    assert response.status_code == 200
    assert isinstance(response.json(), list)

# Test check whole flow of chat request
def test_creat_chat_request(client):
            # Phase 1: Test POST request    
            payload = {"prompt": "Hello, how are you?"}
            response = client.post('/requests', json=payload)
            assert response.status_code == 200

            # Phase 2: Test GET request
            data = response.json()
            assert "answer" in data
            assert isinstance(data["answer"], str)
            assert len(data["answer"]) > 0 

            # Phase 3: Test GET request
            history_response = client.get('/requests')
            history_data = history_response.json()

            # Phase 4: Check history
            assert len(history_data) > 0
            found = False
            for item in history_data:
                if item["prompt"] == payload["prompt"]:
                    found = True
                    break
            assert found, "Prompt not found in history"