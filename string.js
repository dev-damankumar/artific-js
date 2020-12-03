function removeChar(str,pos){ 
 return str = str.slice(0, pos) + str.slice(pos+1);
}
String.prototype.reverse=function(){
    return revstr=this.split("").reverse().join("")
} 
String.prototype.trimAll=function(){
    var pattern = /\s/g;
    var result = this.replace(pattern,"");
    return result 
}
String.prototype.charRep=function(){
    this.split("").map((v)=>{
        console.log(v)
    })
}

String.prototype.count = function (c) {
    var result = 0,
        i = 0;
    for (i; i < this.length; i++) {
        if (this[i] == c) {
            result++;
        }
    }
    return result;
};

String.prototype.charRep = function (space) {
    var counts = {};
    var str;
    (space == true)?str = this.trimAll():str = this
    var ch, count;
    for (var i = 0; i < str.length; ++i) {
        ch = str.charAt(i);
        count = counts[ch];
        counts[ch] = count ? count + 1 : 1;
    }
    return counts
}