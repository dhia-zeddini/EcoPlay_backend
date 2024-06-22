import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:perper/Model/contract.dart';

class ContractService {
  final String baseUrl;

  ContractService({required this.baseUrl});

  Future<List<Contract>> fetchContractsForUser() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    final userId = prefs.getString('userId');
    if (token == null || userId == null) {
      throw Exception('No token or userId found');
    }

    final response = await http.post(
      Uri.parse('$baseUrl/contract/getByUser'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: jsonEncode({'userId': userId}),
    );

    print('Response status: ${response.statusCode}');
    print('Response body: ${response.body}');

    if (response.statusCode == 200) {
      List<dynamic> body = json.decode(response.body);
      List<Contract> contracts = body.map((dynamic item) {
        print('Contract item: $item');
        return Contract.fromJson(item);
      }).toList();
      return contracts;
    } else {
      throw Exception('Failed to load contracts');
    }
  }
}
