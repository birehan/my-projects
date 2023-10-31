import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hakim_hub_mobile/features/doctor/data/models/doctor_education_model.dart';
import 'package:hakim_hub_mobile/features/doctor/domain/entities/doctor_detail.dart';
import 'package:hakim_hub_mobile/features/doctor/presentation/widgets/education_section.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

void main() {
  testWidgets('EducationSection displays education details',
      (WidgetTester tester) async {
    // Create a DoctorDetail object with sample education data
    DoctorDetail doctorDetail = DoctorDetail(
      fullName: "fullName",
      about: "about",
      educations: [
        EducationModel(
          degree: 'Bachelor of Medicine',
          institution: 'Medical University',
          startDate: DateTime(2016, 9, 1),
          endDate: DateTime(2022, 6, 30),
          fieldOfStudy: 'Medicine',
          logoUrl: 'assets/images/medical_university_logo.png',
        ),
      ],
      email: "",
      experiences: const [],
      gender: "M",
      id: "id",
      mainInstitutionId: "mainInstitutionId",
      mainInstitutionName: "mainInstitutionName",
      photoUrl: "photoUrl",
      specialities: const [],
      yearsOfExperience: 2,
    );
    // Build our widget with the sample data
    await tester.pumpWidget(
      ResponsiveSizer(builder: (context, orientation, screenType) {
        return MaterialApp(
          home: Scaffold(
            body: EducationSection(doctorDetail: doctorDetail),
          ),
        );
      }),
    );

    // Verify that the correct education details are displayed
    expect(find.text('Bachelor of Medicine'), findsOneWidget);
    expect(find.text('Medical University'), findsOneWidget);
  });

  testWidgets('EducationSection displays "No Education" for empty educations',
      (WidgetTester tester) async {
    // Create a DoctorDetail object with empty educations
    final DoctorDetail doctorDetail = DoctorDetail(
      fullName: "fullName",
      about: "about",
      educations: const [],
      email: "",
      experiences: const [],
      gender: "M",
      id: "id",
      mainInstitutionId: "mainInstitutionId",
      mainInstitutionName: "mainInstitutionName",
      photoUrl: "photoUrl",
      specialities: const [],
      yearsOfExperience: 2,
    );

    // Build our widget with the sample data
    await tester.pumpWidget(
      ResponsiveSizer(builder: (context, orientation, screenType) {
        return MaterialApp(
          home: Scaffold(
            body: EducationSection(doctorDetail: doctorDetail),
          ),
        );
      }),
    );

    // Verify that "No Education" is displayed for empty educations
    expect(find.text('Education'), findsOneWidget);
  });
}
