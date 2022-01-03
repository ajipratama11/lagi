export function isNameJoe(value) {
    return value === "Aprat";
  }
  
  export function notGmail(value = "") {
    return !value.includes("gmail");
  }
  export function notYahoo(value = "") {
    return !value.includes("yahoo");
  }

  export function UpperCase(value = ""){
    return /[A-Z]/.test(value);
  }

  export function LowerCase(value = ""){
    return /[a-z]/.test(value);
  }

  export function numberV(value = ""){
    return /[0-9]/.test(value);
  }

  export function symbol(value = ""){
    return /[#?!@$%^&*-]/.test(value);
  }
  
  export function isEmailAvailable(value) {
    if (value === "") return true;
  
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(value.length > 10);
      }, 500);
    });
  }
  