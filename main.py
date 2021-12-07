import math
from sympy.ntheory import factorint
import sympy
G_P = 19
G_Q = 11
G_N = G_P * G_Q
G_A = 1 # check with 1

# x**2 = a (mod G_P*G_Q)

# Theorem (page.76) for n = m1 m2 m3 ..., where
# m1 m2 m3 ... mutually prime
# second degree comparison has a solution, if
# solvable x**2 = a (mod m1), x**2 = a (mod m2), x**2 = a (mod m3) ... 

def Sign(num):
    if (num < 0):
        return ' - '
    return ' + '

def Unit(num):
    if (num == 1):
        return ''
    return num

def Power(num, x):
    if (num == 1):
        return x + ''
    
    return x + '^' + str(num)

def getPolynom(A):
    x = 'x'
    k = 0
    while (A[ k ]==0):
        k += 1
        
    n = len(A)
    ak = A[ k ]
    a0 = A[n-1]

    polynom = ''

    if (ak == -1):
       polynom = '-' + Power(n-k, x)
    else:
        polynom = str(Unit(ak)) + Power(n-k, x)

    i = k + 1

    while i < n-1:
        ai = A[i]
        if (ai == 0):
            polynom += ''
        else:
            polynom += Sign(ai) + str(Unit(abs(ai))) + Power(n-1-i, x)

        i += 1

    if (abs(a0)==0):
        polynom += ''
    else:
        polynom += Sign(a0) + str(abs(a0))

    return polynom;


def solveCongruence(A,m):
    res = []
    x = 0
    k = 0
    n = len(A)
    while x < m:
        p = 1
        y = A[n-1]
        for i in range(n):
            p *= x
            y += A[n-1-i]*p
        if (y % m == 0):
            res.append(str(x))
            k += 1
        x += 1
    return res


def solveModularPolynom():
    A = [1, -G_A]
    m = G_N
    n = 2
    mod = m
    
    polynom = getPolynom(A)+'='+str(mod)
    solves = solveCongruence(A,m)
    if (not solves):
        print ('There is no solutions')
    else:
        print (f'Solution for polynom {polynom} : {solves}')


def findSolution():
    # CGD(a,n) = 1
    if (math.gcd(G_A,G_N) != 1):
        print ('a must be mutually prime with n')
        return

    if (G_P % 4 != 3 or G_Q % 4 != 3):
        # example 2.32
        print('Comparison unsolvable. There is solve exist: x**2 = a (mod p) => p = 3 (mod 4)' )
        return

    dLegaP = sympy.ntheory.residue_ntheory.legendre_symbol(G_A,G_P) 
    if dLegaP == -1:
        print ('a quadratic nonresidue modulo p')
        return

    dLegaQ = sympy.ntheory.residue_ntheory.legendre_symbol(G_A,G_Q) 
    if dLegaQ == -1:
        print ('a quadratic nonresidue modulo q')
        return

    print ('a modulo quadratic residue q и p')   

    # x = a**((p+1)/2) (mod p) для p = 3 (mod 4)

    # x2 = pow(G_A, (G_P + 1) // 4, G_P) + G_P*k 
    # x2 = pow(G_A, (G_Q + 1) // 4, G_Q) + G_Q*k 
    # x1 = pow(G_A, 3, G_P)
    # x2 = pow(G_A, 3, G_Q)

    # k1 = pow(x1, 2, G_N)
    # k2 = pow(x2, 2, G_N)

    # print (f'Solve: x1: {x1}, x2: {x2}, x3: {G_N-x1}, x4: {G_N-x2}')
    solveModularPolynom()

    return

def main():

    if (len(factorint(G_P)) == 1 and len(factorint(G_Q)) == 1):
        findSolution()
    else:
        print('Err: One of input value isn\'t primary' )
        exit(-1)


if __name__ == "__main__":
	main()
