const { validationResult } = require("express-validator");
const Student = require("../models/Student");
const BussPass = require("../models/Profile");
const moment = require("moment");

exports.applyForBusPass = async (req, res) => { 
  try{
    const { busFrom,busDestination,validDate, applyDate} = req.body;
    const id = req.user.id;

   const parsedValidDate = moment(validDate, "DD/MM/YYYY").toDate();

    const studentDetails = await Student.findOne({_id: id});
    console.log(typeof studentDetails);

    const studentProfile = await BussPass.findById(studentDetails.additionalDetails);

    const busPassId = generateBusPassId();

    const busPass = {
      busPassId,
      busFrom,
      busDestination,
      applyDate: new Date(),
      validDate: parsedValidDate,
    }

    studentProfile.bussPass.push(busPass);

    await studentProfile.save();

    return res.status(200).json({
      success : true,
      message : "Bus Pass Applied Successfully",
      data : studentProfile
    });
  }
  catch(error){
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// exports.applyForBusPass = async (req, res) => {
//   try {
//     const {busFrom,busDestination,validDate,applyDate} = req.body;
//     const id = req.user.id;
//     // Find the student profile by ID
//     const studentProfile = await Student.findOne({ _id: id });
//     // If no student profile is found, send an error response
//     if (!studentProfile) {
//       return res.status(404).json({
//         success: false,
//         message: "Student profile not found",
//       });
//     }

//     // Ensure that bussPass array exists and initialize it if not
//     if (!studentProfile.bussPass) {
//       studentProfile.bussPass = [];
//     }

//     // Generate a unique bus pass ID
//     const busPassId = generateBusPassId();
//     // Create a new bus pass object with the provided details and add to the students bus passes
//     const busPass = {
//       busPassId,
//       busFrom,
//       busDestination,
//       applyDate: new Date(),
//       validDate,
//     };
    
//     console.log(busPass);

//     studentProfile.bussPass.push(busPass);
    
    
//     // Save the updated student profile
//     await studentProfile.save();

//     return res.status(200).json({
//       success: true,
//       message: 'Bus pass application submitted successfully',
//       data: busPass,
//     });

  
//   }catch (error) {
//     console.log(error.message);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal Server Error',
//     });
//   }
// };


function generateBusPassId() {
    // Implement your logic to generate a unique bus pass number
    // For example, you can use a combination of timestamp and random numbers
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    const busPassId = `DKTE${randomNum}`;
    return busPassId; 
}


// Renew Bus Pass with new Valid Date
exports.renewBusPass = async (req, res) => {
    try {
      // Validate input using express-validator or other validation method
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }
  
      // Extract necessary information from the request
      const { studentId, validDate, busPassId } = req.body;
  
      const parsedValidDate = moment(validDate, "DD/MM/YYYY").toDate();
  
      // Find the student profile and add the bus pass to the array
      const studentProfile = await BussPass.findOne({ studentId });
  
      if (!studentProfile) {
        return res.status(400).json({
          success: false,
          message: "Student profile not found",
        });
      }
  
      // Find the bus pass to be renewed
      const busPass = studentProfile.bussPass.find(
        (busPass) => busPass.busPassId === busPassId
      );
  
      if (!busPass) {
        return res.status(400).json({
          success: false,
          message: "Bus pass not found",
        });
      }
  
      // Update the valid date of the bus pass
      busPass.validDate = parsedValidDate;
  
      // Save the student profile with the updated bus pass array
      await studentProfile.save();
  
      return res.status(200).json({
        success: true,
        message: "Bus pass renewed successfully",
        data: busPass,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while renewing the bus pass",
      });
    }
  };