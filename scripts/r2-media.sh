#!/usr/bin/env bash
set -euo pipefail

REMOTE="r2:cookbook"
MEDIA_DIR="$(dirname "$0")/media"

push() {
  local files=("$@")
  if [[ ${#files[@]} -eq 0 ]]; then
    files=("$MEDIA_DIR"/*)
  fi

  local count=0
  for f in "${files[@]}"; do
    [[ -f "$f" ]] || continue
    ext="${f##*.}"
    case "${ext,,}" in
      jpg|jpeg|png|gif|webp|svg|avif) ;;
      *) continue ;;
    esac
    echo "  uploading $(basename "$f")..."
    rclone copyto "$f" "$REMOTE/$(basename "$f")"
    count=$((count + 1))
  done

  echo "Pushed $count file(s)"
}

pull() {
  mkdir -p "$MEDIA_DIR"
  if [[ $# -gt 0 ]]; then
    for key in "$@"; do
      echo "  downloading $key..."
      rclone copyto "$REMOTE/$key" "$MEDIA_DIR/$key"
    done
    echo "Pulled $# file(s)"
  else
    echo "Pulling all files..."
    rclone copy "$REMOTE" "$MEDIA_DIR"
    echo "Done"
  fi
}

ls_remote() {
  rclone lsf "$REMOTE"
}

case "${1:-}" in
  push)  shift; push "$@" ;;
  pull)  shift; pull "$@" ;;
  ls)    ls_remote ;;
  *)
    echo "Usage: r2-media.sh <command> [files...]"
    echo ""
    echo "Commands:"
    echo "  push [file...]   Upload images to R2 (default: all in scripts/media/)"
    echo "  pull [file...]   Download images from R2 (default: all in manifest)"
    echo "  ls               List remote files"
    ;;
esac
