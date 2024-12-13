import yt_dlp
import subprocess
import os

def download_video(url, output_filename):
    """Download a YouTube video using yt-dlp."""
    ydl_opts = {
        'format': 'best[ext=mp4]',
        'outtmpl': output_filename
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

def extract_segment(input_file, start_time, duration, output_file):
    """Extract a segment from a video file using ffmpeg."""
    cmd = [
        'ffmpeg', '-i', input_file,
        '-ss', str(start_time),
        '-t', str(duration),
        '-c:v', 'copy',
        '-c:a', 'copy',
        output_file,
        '-y'  # Overwrite output files without asking
    ]
    subprocess.run(cmd)

def concatenate_videos(input_files, output_file):
    """Concatenate multiple video files using ffmpeg."""
    # Create a temporary file listing all input files
    with open('temp/concat_list.txt', 'w') as f:
        for file in input_files:
            f.write(f"file '{os.path.abspath(file)}'\n")
    
    # Concatenate the files
    cmd = [
        'ffmpeg',
        '-f', 'concat',
        '-safe', '0',
        '-i', 'temp/concat_list.txt',
        '-c', 'copy',
        output_file,
        '-y'
    ]
    subprocess.run(cmd)

def create_warehouse_compilation():
    # Video URLs
    warehouse_url = "https://www.youtube.com/watch?v=UW3yxwedj7I"
    operations_url = "https://www.youtube.com/watch?v=XK603-FIyaA"
    
    # Create temp directory if it doesn't exist
    if not os.path.exists('temp'):
        os.makedirs('temp')
    
    try:
        # Download videos
        print("Downloading warehouse video...")
        download_video(warehouse_url, "temp/warehouse.mp4")
        
        print("Downloading operations video...")
        download_video(operations_url, "temp/operations.mp4")
        
        # Extract warehouse segment
        print("Extracting warehouse segment...")
        extract_segment("temp/warehouse.mp4", 0, 14, "warehouse_overview.mp4")
        
        # Extract operations segments
        print("Extracting operations segments...")
        extract_segment("temp/operations.mp4", 513, 9, "temp/segment1.mp4")
        extract_segment("temp/operations.mp4", 568, 9, "temp/segment2.mp4")
        extract_segment("temp/operations.mp4", 590, 11, "temp/segment3.mp4")
        
        # Combine operations segments
        print("Combining operations segments...")
        segments = [
            "temp/segment1.mp4",
            "temp/segment2.mp4",
            "temp/segment3.mp4"
        ]
        concatenate_videos(segments, "operations_compilation.mp4")
        
        print("Videos have been created successfully:")
        print("1. warehouse_overview.mp4")
        print("2. operations_compilation.mp4")
        
    finally:
        # Clean up
        print("Cleaning up temporary files...")
        if os.path.exists('temp'):
            for file in os.listdir('temp'):
                try:
                    os.remove(os.path.join('temp', file))
                except Exception as e:
                    print(f"Error removing {file}: {e}")
            os.rmdir('temp')

if __name__ == "__main__":
    create_warehouse_compilation()