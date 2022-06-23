const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = 5001;
// middleware
app.use(cors());
app.use(express.json());

// Routes
///Get all Honeypots
app.get("/honeypots", async (req, res) => {
	try {
		const results = await pool.query(
			`SELECT * FROM honeypots`,
		);

		res.status(200).json({
			status: "success",
			results: results.rows.length,
				data: {
				honeypots: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

///Rename honeypot
app.put("/honeypots/rename/:id", async (req, res) => {
	try {
	  const { id } = req.params;
	  const { name } = req.body;
	  await pool.query(
		"UPDATE honeypots SET name = $1 WHERE h_id = $2",
		[name, id]
	  );
  
	  res.status(200).json("Honeypot name updated");
	} catch (err) {
	  console.error(err.message);
	}
  });

  ///GET sessions statistics
app.get("/sessions/attacker-stats", async (req, res) => {
	try {
		const results = await pool.query(
			`SELECT * FROM
			(SELECT a_ip, COUNT(*) as honeypotCount
			  FROM 
				(
				 SELECT a_ip FROM honeypots NATURAL JOIN sessions GROUP BY a_ip, h_id
				) as z GROUP BY a_ip) 
			as table1 
			NATURAL JOIN
				(
				SELECT sessions.a_ip, COUNT(*) as sessionCount 
				FROM honeypots NATURAL JOIN sessions GROUP BY sessions.a_ip
				) 
			as table2 ORDER BY table1.honeypotCount DESC`,
		);

		res.status(200).json({
			status: "success",
			results: results.rows.length,
				data: {
					attackerStats: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

///Get top 10 usernames  
  app.get("/dashboard/usernames", async (req, res) => {
	try {
		const results = await pool.query(
			`SELECT username, COUNT(*) as count
			FROM authorizations
			GROUP BY username
			ORDER BY count DESC
			LIMIT 10`,
		);

		res.status(200).json({
			status: "success",
			results: results.rows.length,
				data: {
				usernames: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

///Get top 10 passwords  
app.get("/dashboard/passwords", async (req, res) => {
	try {
		const results = await pool.query(
			`SELECT password, COUNT(*) as count
			FROM authorizations
			GROUP BY password
			ORDER BY count DESC
			LIMIT 10`,
		);

		res.status(200).json({
			status: "success",
			results: results.rows.length,
				data: {
				passwords: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

///Get honeypot count
app.get("/dashboard/honeypot-count", async (req, res) => {
	try {
		const results = await pool.query(
			`SELECT COUNT(*) FROM honeypots`,
		);

		res.status(200).json({
			status: "success",
			results: results.rows.length,
				data: {
				honeypotCount: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

///Get todays sessions count
app.get("/dashboard/today-count", async (req, res) => {
	try {
		const results = await pool.query(
			`SELECT COUNT(*) as number
			FROM sessions
			WHERE conn_start = CURRENT_DATE`,
		);

		res.status(200).json({
			status: "success",
			results: results.rows.length,
				data: {
				todayCount: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

///Get all sessions count
app.get("/dashboard/all-count", async (req, res) => {
	try {
		const results = await pool.query(
			`SELECT COUNT(*) as number FROM sessions`,
		);

		res.status(200).json({
			status: "success",
			results: results.rows.length,
				data: {
				allCount: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

///Get attacks/sessions per country
app.get("/dashboard/attacks-by-country", async (req, res) => {
	try {
		const results = await pool.query(
			`SELECT country, COUNT(*) as number
			FROM more_info
			GROUP BY country`,
		);

		res.status(200).json({
			status: "success",
			results: results.rows.length,
				data: {
					attackByCountry: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

///Get attacks/sessions per country
app.get("/dashboard/attacks-by-honeypot", async (req, res) => {
	try {
		const results = await pool.query(
			`SELECT e.h_id, e.name, q.count
			FROM honeypots e JOIN
		  (
			SELECT h_id,COUNT(*) as count 
			FROM sessions 
			GROUP BY h_id
		  ) q ON e.h_id = q.h_id
		   ORDER BY e.h_id DESC`,
		);

		res.status(200).json({
			status: "success",
			results: results.rows.length,
				data: {
					attackByHoneypot: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

///Get all Commands
app.get("/commands", async (req, res) => {
	try {
		const results = await pool.query(
			`SELECT * FROM commands`,
		);

		res.status(200).json({
			status: "success",
			results: results.rows.length,
				data: {
					commands: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

///Get all Attackers
app.get("/attackers", async (req, res) => {
	try {
		const results = await pool.query(
			`SELECT * FROM attackers`,
		);

		res.status(200).json({
			status: "success",
			results: results.rows.length,
				data: {
				attackers: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

///Get all Sessions
app.get("/sessions", async (req, res) => {
	try {
		const results = await pool.query(
			`SELECT * FROM sessions`,
		);

		res.status(200).json({
			status: "success",
			results: results.rows.length,
				data: {
				sessions: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});  


/// POST Attackers
app.post("/uploadAttackers", async(req, res) => {
	try {
		const { fingerprint, key } = req.body;

		const enterData = await pool.query(
		"INSERT INTO attackers(fingerprint, a_ssh_key) VALUES($1, $2)",
		[fingerprint, key]);
		res.status(200).json({"status": "success"});
	} catch (error) {
		console.error(error.message)
		res.status(400).json({"status": "failed"});
	}
})

app.post("/uploadAuths", async(req, res) => {
	try {
		const { session, is_succesful, username, password, timestamp } = req.body;

		const enterData = await pool.query(
		"INSERT INTO authorizations(session, is_succesful, username, password, attempt_time) VALUES($1, $2, $3, $4, $5)",
		[session, is_succesful, username, password, timestamp]);
		res.status(200).json({"status": "success"});
	} catch (error) {
		console.error(error.message)
		res.status(400).json({"status": "failed"});
	}
})

/// POST Sessions
app.post("/uploadSessions", async(req, res) => {
	try {
		const { session, timestamp, h_id, fingerprint, src_ip } = req.body;

		const enterData = await pool.query(
		"INSERT INTO sessions(session, conn_start, h_id, fingerprint, a_ip) VALUES($1, $2, $3, $4, $5)", 
		[session, timestamp, h_id, fingerprint, src_ip]);
		res.status(200).json({"status": "success"});
	} catch (error) {
		console.error(error.message)
		res.status(400).json({"status": "failed"});
	}
})

/// POST More_details
app.post("/uploadCountry", async(req, res) => {
	try {
		const { country, session } = req.body;

		const enterData = await pool.query(
			"INSERT INTO more_info(country, session) VALUES($1, $2)",
			[country, session]);
			res.status(200).json({"status":"success"});
	} catch (error) {
		console.error(error.message)
		res.status(400).json({"status":"failed"});
		
	}
})

/// POST Commands
app.post("/uploadInputs", async(req, res) => {
	try {
		const { input, comm_time, session } = req.body;

		const enterData = await pool.query(
		"INSERT INTO commands(input, comm_time, session) VALUES($1, $2, $3)",
		[input, comm_time, session]);
		res.status(200).json({"status": "success"});
	} catch (error) {
		console.error(error.message)
		res.status(400).json({"status": "failed"});
	}
})

/// POST Testing
app.post("/test", async (req, res) => {
	try {
		const { one, two } = req.body;
		const enterData = await pool.query(
			"INSERT INTO testings(one, two) VALUES($1, $2) RETURNING *",
			[one, two]);
	} catch (error) {
		console.error(error.message)
	}
})


app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`);
});
