import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'AuthService.dart';

class ClaimService {
  static const String baseUrl = 'http://192.168.65.31:9001';

  Future<void> createClaim(String title, String description) async {
    final authService = AuthService();
    final token = await authService.getToken();

    if (token == null) {
      throw Exception('No token found. Please login again.');
    }

    final response = await http.post(
      Uri.parse('$baseUrl/Claim/create'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $token',
      },
      body: jsonEncode(<String, String>{
        'title': title,
        'description': description,
      }),
    );

    if (response.statusCode == 201) {
      print('Claim created successfully');
    } else {
      final errorResponse = jsonDecode(response.body);
      throw Exception('Failed to create claim: ${errorResponse['message']}');
    }
  }
}
