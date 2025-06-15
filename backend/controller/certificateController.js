import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Certificate } from "../models/certificateSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewCertificate = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      new ErrorHandler("Certificate Image/SVG Required!", 404)
    );
  }
  
  const { name, description, issueDate } = req.body;
  if (!name) {
    return next(new ErrorHandler("Please Provide Certificate's Name!", 400));
  }
  if (!issueDate) {
    return next(new ErrorHandler("Please provide the Issue Date!", 400));
  }

  const { svg } = req.files;
  // const { name } = req.body;
  if (!name) {
    return next(new ErrorHandler("Please Provide Certificate's Name!", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    { folder: "PORTFOLIO CERTIFICATES IMAGES" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload avatar to Cloudinary", 500));
  }
  const certificates = await Certificate.create({
    name,
    description,
    svg: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    issueDate,
  });
  res.status(201).json({
    success: true,
    message: "New Certificate Added!",
    certificates,
  });
});

export const deleteCertificate = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let certificates = await Certificate.findById(id);
  if (!certificates) {
    return next(new ErrorHandler("Already Deleted!", 404));
  }
  const certificateSvgId = certificates.svg.public_id;
  await cloudinary.uploader.destroy(certificateSvgId);
  await certificates.deleteOne();
  res.status(200).json({
    success: true,
    message: "Certificate Deleted!",
  });
});

export const getAllCertificates = catchAsyncErrors(async (req, res, next) => {
  const certificates = await Certificate.find();
  res.status(200).json({
    success: true,
    certificates,
  });
});
