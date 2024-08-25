#!/usr/bin/env bash

fileExists() {
if [ -f $1 ]; then
  return 0
fi
return 1
}

NAMEDIR=$(basename "$PWD")

if fileExists 'dev-pid.txt'; then
  kill -9 `cat dev-pid.txt`
  # kill all app
  pslist=($(ps aux | grep -i $NAMEDIR | awk '{print $2}'))
  length=${#pslist[@]}

  for i in "${pslist[@]}"
  do
    length=$(($length-1))
    if [ "$length" -ne 0 ]
    then
      echo "kill $i process"
      kill -9 $i
    fi
  done

  # kill nodemon
  pslist=($(ps aux | grep -i nodemon | awk '{print $2}'))

  length=${#pslist[@]}

  for i in "${pslist[@]}"
  do
    length=$(($length-1))
    if [ "$length" -ne 0 ]
    then
      echo "kill $i process"
      kill -9 $i
    fi
  done

  # kill ts-node
  pslist=($(ps aux | grep -i ts-node | awk '{print $2}'))
  length=${#pslist[@]}

  for i in "${pslist[@]}"
  do
    length=$(($length-1))
    if [ "$length" -ne 0 ]
    then
      echo "kill $i process"
      kill -9 $i
    fi
  done

  rm dev-pid.txt
fi
