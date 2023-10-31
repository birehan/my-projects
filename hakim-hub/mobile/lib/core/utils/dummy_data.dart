final String hospitalSummaryData = '';

String dummyData(String name, String degree, String educationalInstitution,
    String specialtyOrAreaOfExpertise, String numberOfYears) {
  return "Hello! I'm $name, and I'm thrilled to be your physician. With $numberOfYears years of experience in $specialtyOrAreaOfExpertise, I am dedicated to providing exceptional care and improving the health and well-being of individuals like you in our community. I received my $degree from $educationalInstitution, where I gained comprehensive knowledge. My goal is to utilize this expertise to accurately diagnose and effectively treat a wide range of medical conditions, ensuring your health and comfort.";
}

String dummyHospitalData(String hospitalName) {
  return "Welcome to $hospitalName, where exceptional healthcare meets compassionate service. Our hospital is dedicated to providing the highest standard of medical care, putting patients at the center of everything we do. With state-of-the-art facilities, a team of skilled healthcare professionals, and a commitment to excellence, we are here to meet your healthcare needs and exceed your expectations.At $hospitalName, we understand that your health is precious, and we strive to create an environment.";
}

String convertDoctorJson(json, newEducations, newExperiences) {
  Map x =  {
    "fullName": json['fullName'] ?? "No Name",
    "about": json['about'] ?? "No About",
    "yearsOfExperience": (json['yearsOfExperience'] ?? 0),
    "mainInstitutionName": json['mainInstitutionName'] ?? "No Institution",
    "specialities": List<String>.from(json['specialities'] ?? []),
    "educations": newEducations,
    "experiences": newExperiences,
  };
  return dummyData(x["fullName"], " ", x["mainInstitutionName"], " ", x['yearsOfExperience'].toString(),);
}
