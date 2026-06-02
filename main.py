from fastapi import FastAPI, Request, Form, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import uvicorn
import database
import os

app = FastAPI(title="Airport Shuttle Booking")

# Ensure DB is initialized
database.init_db()

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates
templates = Jinja2Templates(directory="templates")

# Pydantic model for API
class BookingRequest(BaseModel):
    name: str
    phone: str
    pickup_location: str
    dropoff_location: str
    travel_date: str
    travel_time: str
    passengers: int

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/api/book")
async def create_booking(booking: BookingRequest):
    conn = database.get_connection()
    cursor = conn.cursor()
    
    PRICE_PER_PERSON = 10
    total_price = booking.passengers * PRICE_PER_PERSON
    
    try:
        cursor.execute('''
            INSERT INTO bookings (name, phone, pickup_location, dropoff_location, travel_date, travel_time, passengers, total_price)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            booking.name, 
            booking.phone, 
            booking.pickup_location, 
            booking.dropoff_location, 
            booking.travel_date, 
            booking.travel_time, 
            booking.passengers, 
            total_price
        ))
        conn.commit()
        booking_id = cursor.lastrowid
        return {"success": True, "booking_id": booking_id, "message": "Booking successful!"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
