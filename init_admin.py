import urllib.request
import json
import sys

def register_admin(api_url="https://www.bianaero.top/api/auth/register"):
    data = {
        "username": "admin",
        "password": "123456",  # 初始密码
        "role": "super_admin"
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    req = urllib.request.Request(
        api_url,
        data=json.dumps(data).encode('utf-8'),
        headers=headers,
        method='POST'
    )
    
    print(f"正在尝试注册管理员账号...")
    print(f"目标接口: {api_url}")
    print(f"账号: {data['username']}")
    print(f"密码: {data['password']}")
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            print("\n✅ 注册成功！")
            print(f"响应: {json.dumps(result, ensure_ascii=False)}")
            print("请现在尝试登录后台。")
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f"\n❌ 注册失败 (HTTP {e.code})")
        print(f"Headers: {e.headers}")
        print(f"错误详情: {error_body}")
        if e.code == 403:
            print("\n提示: 如果显示'系统已初始化'，请先去 Supabase 数据库删除旧的 admin 用户。")
    except Exception as e:
        print(f"\n❌ 发生错误: {str(e)}")

if __name__ == "__main__":
    # 默认使用线上地址，也可以传入本地地址 http://localhost:8000/api/auth/register
    target_url = sys.argv[1] if len(sys.argv) > 1 else "https://www.bianaero.top/api/auth/register"
    register_admin(target_url)
