#!/usr/bin/env python3

import subprocess
import json
import argparse

def get_recent_commits(n):
    result = subprocess.run(
        ['git', 'log', '--format=format:%H - %s', f'-n {n}'],
        capture_output=True, text=True, check=True
    )
    commits = []
    for line in result.stdout.splitlines():
        commit, message = line.split(' - ', 1)
        commits.append({'commit': commit, 'message': message})
    return commits

def get_modified_files(commit_hash):
    result = subprocess.run(
        ['git', 'diff-tree', '--name-status', '-r', commit_hash],
        capture_output=True, text=True, check=True
    )
    return result.stdout.splitlines()

def get_file_content_at_commit(commit_hash, file_path):
    try:
        result = subprocess.run(
            ['git', 'show', f'{commit_hash}:{file_path}'],
            capture_output=True, text=True, check=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError:
        return None

def get_commits_content(n_commits):
    commits_content = []
    
    commits = get_recent_commits(n_commits)
    for commit_info in reversed(commits):  # 反序存储提交，保证输出正序
        commit_hash = commit_info['commit']
        commit_message = commit_info['message']
        added_files = {}
        modified_files = {}
        deleted_files = []
        
        modified_files_status = get_modified_files(commit_hash)
        for status_line in modified_files_status:
            if not status_line.strip():
                continue  # 跳过空行或无效行
            parts = status_line.split('\t', 1)
            if len(parts) != 2:
                continue  # 确保拆分后有两个元素
            
            status, file = parts
            file_content = get_file_content_at_commit(commit_hash, file)
            
            if status == 'A':
                if file_content is not None:
                    added_files[file] = file_content
            elif status == 'M':
                if file_content is not None:
                    modified_files[file] = file_content
            elif status == 'D':
                deleted_files.append(file)

        commits_content.append({
            'commit_message': commit_message,
            "added_files": added_files,
            "modified_files": modified_files,
            "deleted_files": deleted_files
        })

    return commits_content

def main():
    parser = argparse.ArgumentParser(description="Dump git commit contents to a JSON file.")
    parser.add_argument('n_commits', type=int, help='Number of recent commits to process')
    args = parser.parse_args()

    print(f"Fetching last {args.n_commits} commits...")
    commits_content = get_commits_content(args.n_commits)
    
    with open('commits_content.json', 'w', encoding='utf-8') as f:
        json.dump(commits_content, f, ensure_ascii=False, indent=4)
    
    print("All commits have been processed and saved to commits_content.json")

if __name__ == "__main__":
    main()