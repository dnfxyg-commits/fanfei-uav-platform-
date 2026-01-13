import os
from database import supabase

def setup_storage():
    print("正在检查 Supabase Storage 配置...")
    try:
        # 列出所有 bucket
        buckets = supabase.storage.list_buckets()
        existing_buckets = [b.name for b in buckets]
        
        if 'images' not in existing_buckets:
            print("正在创建 'images' 存储桶...")
            # 创建一个公开的存储桶
            supabase.storage.create_bucket('images', options={'public': True})
            print("✅ 'images' 存储桶创建成功！")
        else:
            print("✅ 'images' 存储桶已存在。")
            
    except Exception as e:
        print(f"❌ 配置存储失败: {e}")
        print("如果脚本失败，请尝试手动操作：")
        print("1. 登录 Supabase Dashboard -> Storage")
        print("2. 点击 'New Bucket'")
        print("3. 输入名称 'images'")
        print("4. 务必勾选 'Public Bucket'")
        print("5. 点击 Save")

if __name__ == "__main__":
    setup_storage()
