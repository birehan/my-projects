import 'package:expandable_text/expandable_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hakim_hub_mobile/features/doctor/domain/entities/doctor_detail.dart';
import 'package:hakim_hub_mobile/features/doctor/presentation/widgets/biography_section.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

void main() {
  group('BiographySection Widget Test', () {
    // Test data
    final doctorDetail = DoctorDetail(
      fullName: "fullName",
      about:
          "Magna enim est in eiusmod cupidatat excepteur. Velit ut qui nulla mollit cupidatat nulla sunt aliqua velit ut. Dolore veniam ex mollit sunt ut consequat amet eu. Tempor magna ex duis in elit adipisicing est ea sit quis.",
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

    testWidgets('Widget should display biography section correctly',
        (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: ResponsiveSizer(
            builder: (context, orientation, screenType) {
              return Scaffold(
                body: BiographySection(
                  doctorDetail: doctorDetail,
                  isExpanded: false,
                  onExpandedChanged: (value) {},
                ),
              );
            },
          ),
        ),
      );

      // Verify that the text "Biography" is displayed on the screen
      expect(find.text('Biography'), findsOneWidget);

      // Verify that the expandable text is displayed on the screen
      expect(find.byType(ExpandableText), findsOneWidget);

      // Tap the expandable text to expand it
      await tester.tap(find.byType(ExpandableText));
      await tester.pump();

      // Tap the expandable text again to collapse it
      await tester.tap(find.byType(ExpandableText));
      await tester.pump();
    });
  });
}
