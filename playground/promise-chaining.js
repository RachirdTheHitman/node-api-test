require('../src/db/mongoose')
const User = require('../src/models/user')

// 5ca1c8d8153d905bc0d091e4

// User.findByIdAndUpdate('5ca1c917d727065f2091d7f8', { age: 1 }).then((user) => {
//     console.log(user);
//     return User.countDocuments( { age: 1 } )
// }).then((result) => {
//     console.log(result);
    
// }).catch((e) => {
//     console.log(e);
    
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments( { age } )
    return count
}

updateAgeAndCount('5ca1c917d727065f2091d7f8', 2).then((count) => {
    console.log(count);
    
}).catch((e) => {
    console.log(e); 
})