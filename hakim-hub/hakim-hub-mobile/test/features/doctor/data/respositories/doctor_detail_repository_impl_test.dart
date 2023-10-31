import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hakim_hub_mobile/features/doctor/data/datasources/doctor_detail_remote_datasource.dart';
import 'package:hakim_hub_mobile/features/doctor/data/models/doctor_detail_model.dart';
import 'package:hakim_hub_mobile/features/doctor/data/repositories/doctor_detail_repository_impl.dart';
import 'package:hakim_hub_mobile/features/doctor/domain/entities/doctor_detail.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import 'doctor_detail_repository_impl_test.mocks.dart';

@GenerateMocks([DoctorDetailRemoteDataSource])
void main() {
  late DoctorDetailRepositoryImpl repositoryImpl;
  late MockDoctorDetailRemoteDataSource mockDoctorDetailRemoteDataSource;

  setUp(() {
    mockDoctorDetailRemoteDataSource = MockDoctorDetailRemoteDataSource();
    repositoryImpl = DoctorDetailRepositoryImpl(
        remoteDataSource: mockDoctorDetailRemoteDataSource);
  });

  final DoctorDetailModel doctorDetailModel = DoctorDetailModel(
    fullName: "fullName",
    about: "about",
    educations: [],
    email: "email",
    experiences: [],
    gender: "male",
    id: "doctorId",
    mainInstitutionId: "inst_id",
    mainInstitutionName: "mainInstitutionName",
    photoUrl: "photoUrl",
    specialities: [],
    yearsOfExperience: 2,
  );

  const String doctorId = "doctorId";

  test(
      'should return remote data when the call to remote data source is successfull',
      () async {
    when(mockDoctorDetailRemoteDataSource.getDoctorDetail(doctorId))
        .thenAnswer((_) async => doctorDetailModel);

    final result = await repositoryImpl.getDoctorDetail(doctorId);
    verify(mockDoctorDetailRemoteDataSource.getDoctorDetail(doctorId));
    expect(result, equals(Right(doctorDetailModel)));
  });
}
