import 'dart:convert';
import 'dart:io';
import 'package:hakim_hub_mobile/core/error/exception.dart';
import 'package:hakim_hub_mobile/core/utils/base_url.dart';
import 'package:hakim_hub_mobile/features/doctor/data/models/doctor_detail_model.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/filter_doctors_model.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/hospital_detail_model.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/hospital_doctor_model.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/usecases/get_doctor_by_filter.dart';
import 'package:http/http.dart' as http;

abstract class HospitalDetailRemoteDataSource {
  Future<InstitutionDetailModel> getHospitalDetail(String hospitalID);
  Future<List<DoctorModel>> getDoctorByFilter(
      DoctorFilterModel doctorFilterModel);
}

class HospitalDetailRemoteDataSoureImpl
    implements HospitalDetailRemoteDataSource {
  final http.Client client;
  String baseUrl = getBaseUrl();
  HospitalDetailRemoteDataSoureImpl({required this.client});

  @override
  Future<InstitutionDetailModel> getHospitalDetail(String hospitalId) async {
    try {
      final response = await client.get(
        Uri.parse(baseUrl + '/InsitutionProfile/$hospitalId'),
        headers: {
          HttpHeaders.contentTypeHeader: 'application/json',
        },
      );
      if (response.statusCode == 200) {
        final responseBody = response.body;
        if (responseBody.isNotEmpty) {
          final Map<String, dynamic> json = jsonDecode(responseBody)["value"];
          InstitutionDetailModel institutionDetailModel =
              InstitutionDetailModel.fromJson(json);
          return institutionDetailModel;
        } else {
          throw ServerException();
        }
      } else {
        throw ServerException();
      }
    } catch (e) {
      throw ServerException();
    }
  }

  @override
  Future<List<DoctorModel>> getDoctorByFilter(
      DoctorFilterModel doctorFilterModel) async {
    try {
      final response = await client.post(
        Uri.parse(baseUrl +
            '/DoctorProfiles/filter?institutionId=${doctorFilterModel.institutionId}&experienceYears=${-1}&educationName='),
        headers: {
          HttpHeaders.contentTypeHeader: 'application/json',
        },
        body: jsonEncode(doctorFilterModel.specialities),
      );

      if (response.statusCode == 200) {
        final List<dynamic> returnedDoctors =
            jsonDecode(response.body)["value"];

        List<DoctorModel> doctors =
            returnedDoctors.map((data) => DoctorModel.fromJson(data)).toList();

        return doctors;
      } else {
        throw ServerException();
      }
    } catch (e) {
      print(e.toString());

      throw ServerException();
    }
  }
}
