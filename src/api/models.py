from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username
            # do not serialize the password, its a security breach
        }
    
    # Encriptar contraseña
    def hash_password(self, password):
        self.password = generate_password_hash(password)
    
    def __init__(self, email, password, username):
        self.email = email
        self.hash_password(password)
        self.username = username
        
    #Comprobar si el password que introduce el usuario es el mismo que la el de la BD
    def check_password(self, password):
        return check_password_hash(self.password, password)