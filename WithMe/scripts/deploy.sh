#!/bin/bash

REPOSITORY="/home/ubuntu/app/WithMe"
cd $REPOSITORY

APP_NAME=demo
# JAR_NAME=$(ls $REPOSITORY/target/ | grep '.jar' | tail -n 1)
JAR_PATH=$REPOSITORY/target/WithMe-0.0.1-SNAPSHOT.jar

CURRENT_PID=$(pgrep -fl java)

if [ -z "$CURRENT_PID" ]; then
    echo "NOT RUNNING"
else
    echo "> kill -9 $CURRENT_PID"
    kill -15 $CURRENT_PID
    sleep 5
fi

APP_LOG="$REPOSITORY/application.log"
ERROR_LOG="$REPOSITORY/error.log"
DEPLOY_LOG="$REPOSITORY/deploy.log"

echo "> $JAR_PATH 에 실행권한 추가"
chmod +x $JAR_PATH

echo "> $JAR_PATH 배포"
nohup java -jar $JAR_PATH > $APP_LOG 2> $ERROR_LOG &

CURRENT_PID=$(pgrep -f $JAR_PATH)
echo " > 실행된 프로세스 아이디 $CURRENT_PID 입니다." >> $DEPLOY_LOG
