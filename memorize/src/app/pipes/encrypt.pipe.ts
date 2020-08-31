import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'encrypt'
})
export class EncryptPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.args(value, args);
  }
  args(dados: string, args: string) {
    if (args == 'encrypt') {
      this.encrypt(dados);
    }
    if (args == 'decrypt') {
      this.decrypt(dados);
    }
  }
  encrypt(dados) {
    console.log(dados);

    // var mensx = "";
    // var l;
    // var i;
    // var j = 0;
    // var ch;
    // ch = "assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm";
    // for (i = 0; i < dados.length; i++) {
    //   j++;
    //   l = (Asc(dados.substr(i, 1)) + (Asc(ch.substr(j, 1))));
    //   if (j == 50) {
    //     j = 1;
    //   }
    //   if (l > 255) {
    //     l -= 256;
    //   }
    //   mensx += (Chr(l));
    // }
    // return mensx;
  }
  decrypt(dados) {
    // var mensx = "";
    // var l;
    // var i;
    // var j = 0;
    // var ch;
    // ch = "assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm";
    // for (i = 0; i < dados.length; i++) {
    //   j++;
    //   l = (Asc(dados.substr(i, 1)) - (Asc(ch.substr(j, 1))));
    //   if (j == 50) {
    //     j = 1;
    //   }
    //   if (l < 0) {
    //     l += 256;
    //   }
    //   mensx += (Chr(l));
    // }
    // return mensx;
  }


}
// A = ^1 
// B = *11*
// C = *31*
// D = *24*
// E = ^2
// F = *we*
// G = *jk*
// H = *2k*
// I = ^3
// J = *ll*
// K = *23
// L = *12
// M = *ai*
// N = *io*
// O = ^4
// P = *lj*
// Q = *asd*
// R = *fw*
// S = *jo*
// T = *ta*
// U = ^5
// V = *vv*
// W = *wh*
// X = *xu*
// Y = *ya*
// Z = *zo*