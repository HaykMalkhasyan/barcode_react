 
 
 
 export const get_float_num_length = (num) => {
    num = num.toString()
    if(num.includes(".")){
        let arr = num.split(".")
        if(arr[1].includes("e-")){
            let arrn = arr[1].split("e-")
            return +arrn[1]+arrn[0].length
        }else if(num.includes("e+")){
            let arrn = arr[1].split("e+")
            return +arrn[1]+arrn[0].length
        }
        return arr[1].length
    }else if(num.includes("e-")){
        let arr = num.split("e-")
        return arr[1]
    }else if(num.includes("e+")){
        let arr = num.split("e+")
        return arr[1]
    }else{
        return 0 
    }
 }