/*
Simple brute force method
for ex: 
1*x^2 = 1 mod (n)

if some of this comparable with 0 =>
there is one of solution 

(1 * 0^2 - 1) % n == 0
(1 * 1^2 - 1) % n == 0
(1 * 2^2 - 1) % n == 0
(1 * 3^2 - 1) % n == 0
...
(1 * (n-1)^2 - 1) % n == 0

*/

const { performance } = require('perf_hooks');

function SolveCongruenceBig(A, m) {
    var res = [];
    var bigM = BigInt(m);
    var bigA = [];

    for (var _ = 0; _ < A.length; _++) {
        bigA.push(BigInt(A[_]));
    }

    for (var x = BigInt(0), k = 0, n = bigA.length; x < bigM; x++) {
        var p = BigInt(1);

        let y = bigA[n - 1];
        for (var i = 1; i < n; i++) {
            p *= x;
            y += bigA[n - 1 - i] * p;
        }

        if (x === BigInt(98545312)) {
            console.log(y);
        }

        if (y % bigM === BigInt(0)) {
            res[k++] = x;
        }
    }

    return res;
};


function SolveCongruence(A, m) {
    var res = [];

    for (var x = 0, k = 0, n = A.length; x < m; x++) {
        var p = 1;

        let y = A[n - 1];
        for (var i = 1; i < n; i++) {
            p *= x;
            y += A[n - 1 - i] * p;
        }

        if (y % m === 0) {
            res[k++] = x;
        }
    }

    return res;
};

function mod(n, m) {
    return ((n % m) + m) % m;
}

function Legednre(a, p) {
    if (a >= p || a < 0) {
        return Legednre(mod(a, p), p);
    }

    if (a === 1 || a === 0) {
        return a;
    }

    if (a % p === 0) {
        return 0;
    }

    if (a % 2 === 0) {
        return Legednre(a / 2, p) * ((-1) ** (((p ** 2) - 1) / 8));
    }
    if (a % 2 === 1) {
        return Legednre(mod(p, a), a) * ((-1) ** ((a - 1) * (p - 1) / 4));
    }
}

var gcd = function(a, b) {
    if (!b) {
        return a;
    }

    return gcd(b, mod(a, b));
}

function mul_inv(a, b) {

    var b0 = b;
    var x0 = 0;
    var x1 = 1;
    var q, tmp;
    if (b == 1) {
        return 1;
    }
    while (a > 1) {
        q = parseInt(a / b);
        tmp = a;
        a = b;
        b = mod(tmp, b);
        tmp = x0;
        x0 = x1 - (q * x0);
        x1 = tmp;
    }
    if (x1 < 0) {
        x1 = x1 + b0;
    }
    return x1;
}

// chineseRemainder( [a1, a2], [n1, n2])

function chineseRemainder(a, n) {
    var p = 1;
    var i = 1;
    var prod = 1;
    var sm = 0;
    for (i = 0; i < n.length; i++) {
        prod = prod * n[i];
    }
    for (i = 0; i < n.length; i++) {
        p = prod / n[i];
        sm = sm + (a[i] * mul_inv(p, n[i]) * p);
    }
    return sm % prod;
}

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

function Montgomery(a, n, m) {
    if (a > m || a < 1 || m < 0) {
        return None;
    }

    if (n < 2) {
        return a % m;
    }

    var binN = dec2bin(n);

    var c = a ** (Number(binN[0]));
    for (var i = 1; i < binN.length; i++) {
        var c = (c ** 2) % m;
        if (binN[i] === '1') {
            c = (c * a) % m;
        }
    }

    return c;
}

function SolveCongruenceSmart(a, m) {

    var x = [];
    var out = [];
    for (var mIdx = 0; mIdx < m.length; mIdx++) {
        var k = (m[mIdx] - 3) / 4;

        // (a ** (k + 1)) % m[mIdx]; // mod((a ** (k + 1)), m[mIdx]);
        // let xx = mod((a ** (k + 1)), m[mIdx]);

        let xx = Montgomery(a, k + 1, m[mIdx]);
        x.push(xx);
        x.push(xx * (-1));
    }

    if (x.length !== 0) {
        var M = m[0] * m[1];
        for (var i = 0; i < 2; i++) {
            for (var j = 2; j < 4; j++) {
                var crt = chineseRemainder([x[i], x[j]], m);

                if (crt) {
                    crt = mod(crt, M);
                }

                out.push(crt);
            }
        }
    }
    return out;
}

function OutputCongruence(A, p, q) {

    var len = A.length;
    var congruence = "";

    len--;
    if (A[len] < 0) {
        do {
            var a = A[A.length - len - 1];
            if (a) {
                congruence += (a).toString() +
                    "x**" + (len).toString() + " + ";
            }
            len--;
        } while (len != 0);

        congruence = congruence.slice(0, congruence.length - 3);
        congruence += " = " + (Math.abs(G_A)).toString() + " mod (" + (p * q).toString() + ")";
    } else {
        do {
            var a = A[A.length - len - 1];
            if (a) {
                congruence += (a).toString() +
                    "x**" + (len).toString() + " + ";
            }
            len--;
        } while (len != 0);

        congruence = congruence.slice(0, congruence.length - 3);
        congruence += " + " + (G_A).toString() + " = " + "0 mod (" + (p * q).toString() + ")";
    }

    console.log(congruence);
    console.log("p = " + p + "; q = " + q);
}

var G_A = 1;
var A = [1, 0, -G_A];

// var p = 19;
// var q = 11;

var p = 9923;
var q = 9931;
var m = p * q;
var ma = [p, q];

OutputCongruence(A, p, q);

if (gcd(G_A, m) != 1) {
    console.log('a must be mutually prime with n');
    return;
}

if (gcd(G_A, p) != 1 || gcd(G_A, q) != 1) {
    console.log('a must be mutually prime with p and q');
    return;
}

//example 2.32
if (mod(p, 4) !== 3 || mod(q, 4) !== 3) {
    console.log('Comparison unsolvable. There is solve exist: x**2 = a (mod p) => p = 3 (mod 4)');
    return;
}

for (var mIdx = 0; mIdx < ma.length; mIdx++) {
    var prime = ma[mIdx];
    var l = Legednre(G_A, prime);

    if (l === -1) {
        console.log('a quadratic nonresidue modulo');
        return -1;
    }
};


var time = performance.now();

var solve = SolveCongruenceBig(A, m);
console.log("Brute Force method: ", solve);

time = performance.now() - time;
console.log('Execution time (milliseconds): ', time);


time = performance.now();

solve = SolveCongruenceSmart(G_A, ma);
console.log("Smart method: ", solve);

time = performance.now() - time;
console.log('Execution time (milliseconds): ', time);