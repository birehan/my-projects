import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hakim_hub_mobile/features/doctor/domain/entities/doctor_detail.dart';
import 'package:hakim_hub_mobile/features/doctor/domain/repositories/doctor_detail_repository.dart';
import 'package:hakim_hub_mobile/features/doctor/domain/usecases/doctor_detail_usecase.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import 'doctor_detail_usecase_test.mocks.dart';

@GenerateMocks([DoctorDetailRepository])
void main() {
  late MockDoctorDetailRepository mockDoctorDetailRepository;
  late GetDoctorDetail usecase;
  setUp(() {
    mockDoctorDetailRepository = MockDoctorDetailRepository();
    usecase =
        GetDoctorDetail(doctorDetailRepository: mockDoctorDetailRepository);
  });

  final DoctorDetail doctorDetail = DoctorDetail(
    fullName: "fullName",
    about: "about",
    educations: [],
    email: "email",
    experiences: [],
    gender: "male",
    id: "doctor_id",
    mainInstitutionId: "inst_id",
    mainInstitutionName: "mainInstitutionName",
    photoUrl: "photoUrl",
    specialities: [],
    yearsOfExperience: 2,
  );

  const String doctor_id = "doctor_id";

  test('should get single doctor detail', () async {
    when(mockDoctorDetailRepository.getDoctorDetail(doctor_id))
        .thenAnswer((_) async => Right(doctorDetail));
    final result = await usecase(doctor_id);

    expect(result, Right(doctorDetail));
    verify(mockDoctorDetailRepository.getDoctorDetail(doctor_id));
  });
}
