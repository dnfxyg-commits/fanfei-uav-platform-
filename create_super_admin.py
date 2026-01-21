import sys
import os
import getpass

# 添加 backend 目录到搜索路径，以便导入 database 和 auth_utils
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, 'backend')
sys.path.append(backend_dir)

try:
    from database import supabase
    from auth_utils import get_password_hash
except ImportError as e:
    print("错误: 无法导入后端模块。请确保你在项目根目录下运行此脚本，并且已安装所有依赖。")
    print(f"详细错误: {e}")
    sys.exit(1)

def create_super_admin():
    print("="*40)
    print("     创建初始超级管理员 (Super Admin)")
    print("="*40)
    print("说明: 此脚本将直接向数据库插入管理员用户。")
    print("前提: 请确保 .env 文件中配置了 SUPABASE_SERVICE_ROLE_KEY。")
    print("-" * 40)

    username = input("请输入用户名 (默认为 admin): ").strip()
    if not username:
        username = "admin"

    while True:
        password = getpass.getpass("请输入密码: ").strip()
        if not password:
            print("密码不能为空，请重新输入。")
            continue
        
        confirm_password = getpass.getpass("请再次输入密码: ").strip()
        if password != confirm_password:
            print("两次密码输入不一致，请重新输入。")
            continue
        
        break

    print(f"\n正在为用户 '{username}' 生成哈希并写入数据库...")

    # 1. 检查用户是否已存在
    try:
        # 注意：如果 RLS 开启且没有 Policy，且使用的是 Anon Key，这里可能会查不到数据或者报错
        # 但我们假设用户配置了 Service Role Key
        res = supabase.table("admin_users").select("*").eq("username", username).execute()
        if res.data and len(res.data) > 0:
            print(f"\n[失败] 用户名 '{username}' 已存在！")
            return
    except Exception as e:
        print(f"\n[错误] 查询数据库失败: {e}")
        print("提示: 请检查 .env 文件配置，以及是否运行了数据库迁移 SQL。")
        return

    # 2. 生成密码哈希
    password_hash = get_password_hash(password)

    # 3. 插入数据
    try:
        data = {
            "username": username,
            "password_hash": password_hash,
            "role": "super_admin"
        }
        supabase.table("admin_users").insert(data).execute()
        print(f"\n[成功] 超级管理员 '{username}' 创建成功！")
        print("="*40)
        print("现在你可以运行后端服务，并使用此账号登录后台管理系统。")
    except Exception as e:
        print(f"\n[失败] 创建用户失败: {e}")
        print("可能原因:")
        print("1. 数据库表 'admin_users' 不存在 (请运行 supabase_schema.sql)")
        print("2. 权限不足 (请确保 .env 中包含有效的 SUPABASE_SERVICE_ROLE_KEY)")

if __name__ == "__main__":
    create_super_admin()
