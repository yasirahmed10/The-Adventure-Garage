import os
import uuid
import aiofiles
from fastapi import UploadFile, HTTPException
from backend.config.settings import settings


async def save_upload_file(upload_file: UploadFile, folder: str = "images") -> str:
    """
    Saves an uploaded file locally.
    Returns the relative URL path.
    """
    try:
        # Validate file size
        upload_file.file.seek(0, os.SEEK_END)
        file_size = upload_file.file.tell()
        upload_file.file.seek(0)

        max_bytes = settings.MAX_FILE_SIZE_MB * 1024 * 1024
        if file_size > max_bytes:
            raise HTTPException(status_code=400, detail=f"File too large. Max {settings.MAX_FILE_SIZE_MB}MB allowed.")

        # Create unique filename
        ext = upload_file.filename.split(".")[-1] if "." in upload_file.filename else ""
        unique_name = f"{uuid.uuid4().hex}.{ext}"

        # Ensure directory exists
        target_dir = os.path.join(settings.UPLOAD_DIR, folder)
        os.makedirs(target_dir, exist_ok=True)

        file_path = os.path.join(target_dir, unique_name)

        # Save file
        async with aiofiles.open(file_path, 'wb') as out_file:
            content = await upload_file.read()
            await out_file.write(content)

        return f"/uploads/{folder}/{unique_name}"
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
