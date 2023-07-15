function Caculator(){
    this.cong = function(a, b) {
        return eval(a + b);
      };
      this.tru = function(a, b) {
        return eval(a - b);
      };
      this.nhan = function(a, b) {
        return eval(a*b);
      };
      this.chia = function(a,b){
            return eval(a/b);
      }
}
module.exports = Caculator;
