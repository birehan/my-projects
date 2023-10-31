import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hakim_hub_mobile/features/doctor/domain/entities/doctor_detail.dart';
import 'package:hakim_hub_mobile/features/doctor/presentation/widgets/doctor_info_section.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

void main() {
  testWidgets('DoctorInfoSection displays correct information',
      (WidgetTester tester) async {
    // Create a DoctorDetail object with sample data
    final doctorDetail = DoctorDetail(
      fullName: "John Doe",
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
          body: DoctorInfoSection(doctorDetail: doctorDetail),
        ),
      );
    }));

    // Verify that the correct information is displayed
    expect(find.text('John Doe'), findsOneWidget);
    expect(find.text('+ 2 years'), findsOneWidget);
    expect(find.text('not specified'), findsOneWidget);
  });
}
