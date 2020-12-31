//require('dotenv').config()
module.exports = {
    /*app*/
    environment: process.env.ENVIRONMENT || 'PRODUCTION',
    app_port: process.env.PORT || 3977,
    /*database*/
    db_name: process.env.DB_NAME || '',
    db_host: process.env.DB_HOST || '',
    db_port: process.env.DB_PORT || 29058,
    db_user: process.env.DB_USER || '',
    db_password: process.env.DB_PASSWORD || '',
    /*i18n*/
    default_language: process.env.DB_PASSWORD || 'ES',
    /*mail*/
    mail_host: process.env.MAIL_HOST || 'smtp.gmail.com',
    mail_port: process.env.MAIL_PORT || 587,
    mail_secure: process.env.MAIL_SECURE || false,
    mail_tls: process.env.MAIL_TLS || true,
    mail_user: process.env.MAIL_USER || '',
    mail_password: process.env.MAIL_PASSWORD || '',
    mail_from: process.env.MAIL_FOM || '',
    /*Log File*/
    active_log_file: process.env.ACTIVE_LOG_FILE || true,
    /*Google Cloud Storage */
    gcs_project_id: process.env.GCS_PROJECT_ID || "",
    gcs_bucket: process.env.GCS_BUCKET || "",
    /*files*/
    max_fileSize_mb:process.env.MAX_FILE_SIZE_MB || 50,
}


