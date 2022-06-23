CREATE DATABASE alementai;

\c alementai

CREATE TABLE honeypots (
    h_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(32),
    h_ip INET,
    h_port VARCHAR(5),
    log_path TEXT,
    mng_ip INET,
    mng_port VARCHAR(5),
    mng_ssh_key VARCHAR(1024),
    fetch_timer TIMESTAMP
);

CREATE TABLE attackers (
    fingerprint VARCHAR(48) PRIMARY KEY,
    a_ssh_key VARCHAR(1024)
);

CREATE TABLE sessions (
    session VARCHAR(32) PRIMARY KEY,
    conn_start TIMESTAMP,
    a_ip INET,
    fingerprint VARCHAR(48),
    h_id BIGINT,
    CONSTRAINT fk_session_fingerprint
    FOREIGN KEY(fingerprint)
    REFERENCES attackers(fingerprint),
    CONSTRAINT fk_session_h_id
    FOREIGN KEY(h_id)
    REFERENCES honeypots(h_id)
);

CREATE TABLE authorizations (
    a_id BIGSERIAL PRIMARY KEY,
    session VARCHAR(32),
    username VARCHAR(128),
    password VARCHAR(128),
    is_succesful BOOLEAN,
    attempt_time TIMESTAMP,
    CONSTRAINT fk_auth_session
    FOREIGN KEY(session)
    REFERENCES sessions(session)
);

CREATE TABLE commands (
    c_id BIGSERIAL,
    session VARCHAR(32),
    input TEXT,
    comm_time TIMESTAMP,
    is_succesful BOOLEAN,
    CONSTRAINT fk_comm_session
    FOREIGN KEY (session)
    REFERENCES sessions(session),
    PRIMARY KEY (c_id, session)
);

CREATE TABLE more_info (
    d_id BIGSERIAL,
    session VARCHAR(32),
    country VARCHAR(3),
    continent_code VARCHAR(2),
    CONSTRAINT fk_more_session
    FOREIGN KEY(session)
    REFERENCES sessions(session),
    PRIMARY KEY (d_id, session)
);