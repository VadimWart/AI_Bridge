from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker, DeclarativeBase, Mapped, mapped_column, Session


engine = create_engine(url="sqlite:///requests.db") 

session = sessionmaker(engine)


class Base(DeclarativeBase):
    pass


class ChatRequest(Base):
    __tablename__ = "chat_requests"

    id: Mapped[int] = mapped_column(primary_key=True)
    ip_address: Mapped[str] = mapped_column(index=True)
    prompt: Mapped[str]
    response: Mapped[str]

    # Representation method for easier debugging



# Generator for Dependency Injection
def get_db():
    with session() as db:
        yield db

def get_user_requests(db: Session, ip_address: str) -> list[ChatRequest]:
    query = select(ChatRequest).filter_by(ip_address=ip_address)
    result = db.execute(query)
    return result.scalars().all()


def add_user_requests(db: Session, ip_address: str, prompt: str, response: str) -> None:
    new_request = ChatRequest(
        ip_address=ip_address,
        prompt=prompt,
        response=response
    )
    db.add(new_request)
    db.commit()