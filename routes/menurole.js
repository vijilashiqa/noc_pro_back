"use strict";
var express = require('express'),
    compress = require('compression'),
    menurole = express.Router(),
    pool = require('../connection/conn'),
    poolPromise = require('../connection/conn').poolp;



menurole.post('/listmenurole', function (req, res, err) {
        var where = [], jwtdata = req.jwt_data, sql, sqlquery = 'SELECT id,rolename,role FROM stock_mgmt.urole',
            sqlqueryc = ' SELECT COUNT(*) AS count FROM stock_mgmt.urole', finalresult = [],
            data = req.body;
    
        // if (jwtdata.role > 777 && data.hdid != '' && data.hdid != null) where.push(` device.hdid= ${data.hdid} `);
        // if (jwtdata.role <= 777) where.push(` device.hdid= ${jwtdata.hdid} `);
    
        // if (where.length > 0) {
        //     where = ' WHERE' + where.join(' AND ');
        //     sqlquery += where;
        //     sqlqueryc += where;
        // }
        sqlquery += ' LIMIT ?,? ';
        console.log('test',sqlquery);
        console.log(sqlqueryc);
        pool.getConnection(function (err, conn) {
            if (!err) {
                sql = conn.query(sqlquery, [data.index, data.limit], function (err, result) {
                    if (!err) {
                        finalresult.push(result);
                        sql = conn.query(sqlqueryc, function (err, result) {
                            conn.release();
                            if (!err) {
                                finalresult.push(result[0]);
                                res.end(JSON.stringify(finalresult));
                            } else {
                                console.log('err');
                            }
                        });
                    } else {
                        conn.release();
                    }
                });
            }
        });
    });
    








    
module.exports = menurole;
