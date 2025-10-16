#!/bin/bash

# ##################################################################################################### #
# Description:
# This script performs opendicom/sirius-ris backups.
#
# Version: 1.0.0
# Maintainer: opendicom
# ##################################################################################################### #

function check_envvar() {
  # Capture parameters:
  local FILE_LOG=$1
  local ENV=$2

  echo "["`date +%Y/%m/%d_%H:%M:%S`"] CHECKING ENVIRONMENT VARIABLE ($ENV):" >> $FILE_LOG

  # Check env var  existence:
  if [ "$(echo $ENV)" == "" ]; then
    echo "["`date +%Y/%m/%d_%H:%M:%S`"] ERROR: Environment variable $ENV is not defined." >> $FILE_LOG
    exit 1
  fi
  echo "["`date +%Y/%m/%d_%H:%M:%S`"] OK: Environment variable $ENV is defined." >> $FILE_LOG
}

function check_directory() {
  # Capture parameters:
  local FILE_LOG=$1
  local DIR=$2

  echo "["`date +%Y/%m/%d_%H:%M:%S`"] CHECKING TARGET DIRECTORY ($DIR):" >> $1

  # Check directory existence:
  if [ ! -d "$DIR" ]; then
        echo "["`date +%Y/%m/%d_%H:%M:%S`"] ERROR: Directory $DIR does not exist." >> $1
    exit 1
  fi
  echo "["`date +%Y/%m/%d_%H:%M:%S`"] OK: Directory check successful." >> $1
}

function retain_policy(){
  # Capture parameters:
  local FILE_LOG=$1
  local DIR=$2
  local FILE_PREFIX=$3
  local RETAIN=$4

  # Set current working directory
  local WORKDIR=$(pwd)

  # Go to the directory:
  cd $DIR

  echo "["`date +%Y/%m/%d_%H:%M:%S`"] APPLYING RETENTION POLICY: $DIR" >> $FILE_LOG

  local CURRENT_FILE_COUNT=$(ls | wc -l)
  if [ $CURRENT_FILE_COUNT -ge $RETAIN ]; then
     local FILE_TO_DELETE=$(find -type f -name "*$FILE_PREFIX*" -printf '%T+ %P\n' | sort | head -n1 | cut -f2 -d' ')
     rm -f $FILE_TO_DELETE
     echo "["`date +%Y/%m/%d_%H:%M:%S`"] OK: Deleted file $DIR$FILE_TO_DELETE" >> $FILE_LOG
  fi
  echo "["`date +%Y/%m/%d_%H:%M:%S`"] OK: Retention policy applied successfully." >> $FILE_LOG
  cd $WORKDIR
}

function database_backup(){
  # Capture parameters:
  local FILE_LOG=$1
  local BACKUP_FILENAME=$2

  echo "["`date +%Y/%m/%d_%H:%M:%S`"] CREATING DATABASE DUMP: $DBNAME" >> $FILE_LOG

  #Backup database:
  mongodump --authenticationDatabase admin -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} --db ${MONGO_INITDB_DATABASE} --archive > $BACKUP_FILENAME

  if [ $? != 0 ]; then
        echo "["`date +%Y/%m/%d_%H:%M:%S`"] ERROR: There was a problem during the database dump." >> $FILE_LOG
  	exit 1
  fi
  echo "["`date +%Y/%m/%d_%H:%M:%S`"] OK: Dump successful." >> $FILE_LOG
}

function run_backup(){
    local BACKUP_DST_PATH=$1
    local BACKUP_RETENTION=$2
    local PREFIX="sirius_db_backup"
    local BACKUP_FILENAME=`date +%Y-%m-%d_%H-%M-%S`"_"$PREFIX".dump"

    local LOG_PATH=$BACKUP_DST_PATH"log/"
    local FILE_LOG=$LOG_PATH`date +%Y-%m-%d_%H-%M-%S`".log"

    # Check existence of directories:
    check_directory $FILE_LOG $BACKUP_DST_PATH

    # Check existence of environment variables with values:
    check_envvar $FILE_LOG "MONGO_INITDB_DATABASE"
    check_envvar $FILE_LOG "MONGO_INITDB_ROOT_PASSWORD"
    check_envvar $FILE_LOG "MONGO_INITDB_ROOT_USERNAME"

    # Applying retention policies on backup files:
    retain_policy $FILE_LOG $BACKUP_DST_PATH $PREFIX $BACKUP_RETENTION

    # Applying retention policies on log files:
    retain_policy $FILE_LOG $LOG_PATH ".log" $BACKUP_RETENTION

    # Backup database:
    database_backup $FILE_LOG $BACKUP_DST_PATH$BACKUP_FILENAME
}

#Run backup script:
run_backup $1 $2