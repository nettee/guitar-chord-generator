#!/usr/bin/env python3

import json
import subprocess

def load_commits_content(file_path='commits_content.json'):
    with open(file_path, 'r', encoding='utf-8') as f:
        commits_content = json.load(f)
    return commits_content

def apply_commit(commit):
    commit_message = commit['commit_message']
    
    print(f"Applying commit: {commit_message}")
    
    for file_path, content in commit['files'].items():
        print(f"  Writing file: {file_path}")
        # 写入文件内容
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        # 添加到 Git 暂存区
        subprocess.run(['git', 'add', file_path], check=True)

    # 提交
    subprocess.run(['git', 'commit', '-m', commit_message], check=True)
    print(f"Commit applied: {commit_message}\n")

def main():
    file_path = 'commits_content.json'
    commits_content = load_commits_content(file_path)
    
    for commit in commits_content:
        apply_commit(commit)

if __name__ == "__main__":
    main()