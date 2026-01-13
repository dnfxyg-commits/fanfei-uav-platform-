import os
from dotenv import load_dotenv

load_dotenv()

url = os.environ.get("SUPABASE_URL", "")
key = os.environ.get("SUPABASE_KEY", "")

print(f"URL Length: {len(url)}")
print(f"URL Content: {url}")
print(f"Key Length: {len(key)}")
print(f"Key Start: {key[:10]}...")
print(f"Key End: ...{key[-10:]}")
