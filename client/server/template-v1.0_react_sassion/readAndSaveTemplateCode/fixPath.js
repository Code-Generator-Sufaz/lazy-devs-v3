

const fixPath = str =>{
    //  /home/user/Desktop/Backend/bookstore + ../what
  const arr = str.split('/')
  let targetIndex = -1
  // find the target
  arr.forEach((x,i)=>{
    if(x[x.length-1]=='.') targetIndex=i
  })
  
  if (targetIndex == -1) return str
  
  let numOfDot = arr[targetIndex].split('.').length-1
  // for (let i = arr[targetIndex].length - 1; i>-1; i--){
  //   if(arr[targetIndex][i]==='.') numOfDot++
  // }
  if(numOfDot===1){
    arr[targetIndex]=arr[targetIndex].split('.')[0]
    return arr.join('/')
  }
 
  const goUpper = numOfDot -1
  return [...arr.slice(0, targetIndex-goUpper+1), ...arr.slice(targetIndex+1)].join('/')
}

// console.log(fixPath('/home/user/Desktop/Backend/bookstore'+ "./views/content"))
module.exports = fixPath