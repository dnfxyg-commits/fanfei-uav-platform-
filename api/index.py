import sys
import os

# 将 backend 目录加入 python path，使 Vercel 能找到 main.py 和依赖的模块
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))

from main import app
