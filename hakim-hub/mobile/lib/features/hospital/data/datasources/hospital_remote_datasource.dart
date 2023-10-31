

import 'dart:convert';
import 'dart:io';

import 'package:hakim_hub_mobile/core/error/exception.dart';
import 'package:hakim_hub_mobile/core/utils/base_url.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/filter_hospital_model.dart';
import 'package:http/http.dart' as http;

import '../models/hospital_search_model.dart';


abstract class HospitalSearchRemoteDataSource {
  Future<List<InstitutionSearchModel>> searchByFilterHospitals(
      FilterHospitalModel filterHospitalModel);

  Future<List<InstitutionSearchModel>> searchByNameHospitals(
      String name);
  Future<List<InstitutionSearchModel>> getAllHospitals();
}

class HospitalSearchRemoteDataSourceImpl implements HospitalSearchRemoteDataSource {
  final http.Client client;
  String baseUrl = getBaseUrl();
  HospitalSearchRemoteDataSourceImpl({required this.client});

  @override
  Future<List<InstitutionSearchModel>> searchByFilterHospitals(FilterHospitalModel filterHospitalModel) async {
    
    try {

      final response = await client.post(
        
        Uri.parse(baseUrl + '/InsitutionProfile/search-institutions?operationYears=${filterHospitalModel.operationYears}&openStatus=${filterHospitalModel.openStatus}'),
        headers: {
          HttpHeaders.contentTypeHeader: 'application/json',
        },
        body: json.encode(filterHospitalModel.services),
      );

      if (response.statusCode == 200) {
        
        List<dynamic> returned = json.decode(response.body)["value"];

        List<InstitutionSearchModel> hospitals = returned.map((data) => InstitutionSearchModel.fromJson(data)).toList();
        return hospitals;
      } else {
        throw ServerException();
      }
      
    } catch (e) {
      throw ServerException();
    }
  }

  @override
  Future<List<InstitutionSearchModel>> searchByNameHospitals(String name) async {
    try {
      final response = await client.get(
        Uri.parse(baseUrl + '/InsitutionProfile/search-by-name?Name=$name'),
        headers: {
          HttpHeaders.contentTypeHeader: 'application/json',
        },
      );

      if (response.statusCode == 200) {
      
        List<dynamic> returned = json.decode(response.body)["value"];

        List<InstitutionSearchModel> hospitals = returned.map((data) => InstitutionSearchModel.fromJson(data)).toList();
        return hospitals;
      } else {
        throw ServerException();
      }
      
    } catch (e) {
      throw ServerException();
    }
  }

  @override
  Future<List<InstitutionSearchModel>> getAllHospitals() async {
    
    try {
      final response = await client.get(
        Uri.parse(baseUrl + '/InsitutionProfile'),
        headers: {
          HttpHeaders.contentTypeHeader: 'application/json',
        },
      );
    

      if (response.statusCode == 200) {
  
        List<dynamic> returned = json.decode(response.body)["value"];

        List<InstitutionSearchModel> hospitals = returned.map((data) => InstitutionSearchModel.fromJson(data)).toList();
        return hospitals;
      } else {

        throw ServerException();
      }
      
    } catch (e) {
      throw ServerException();
    }
  }
  
}