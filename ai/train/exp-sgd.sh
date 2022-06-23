#! /usr/bin/env sh

REPO="$HOME/project-cyberdyne"
YOLOREPO="$HOME/yolov5"
DST="$HOME/train"


python "$YOLOREPO/train.py" \
    --weights '' \
    --cfg "$YOLOREPO/models/yolov5s.yaml" \
    --data "$REPO/ai/train/data-train.yaml" \
    --hyp "$REPO/ai/train/hyp.sgd.evolve.yaml" \
    --img-size 320 \
    --batch-size -1 \
    --project "$DST/main" \
    --name 'exp.sgd.evolve' \
    --optimizer 'SGD' \
    --image-weights \
    --patience 4 \
    --epochs 4 \
    --workers 3