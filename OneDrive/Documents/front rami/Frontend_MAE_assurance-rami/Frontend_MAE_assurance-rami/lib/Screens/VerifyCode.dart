import 'package:flutter/material.dart';
import '../Services/AuthService.dart';
import 'ResetPassword.dart';

class VerifyCodeScreen extends StatefulWidget {
  final String email;
  VerifyCodeScreen({required this.email});

  @override
  _VerifyCodeScreenState createState() => _VerifyCodeScreenState();
}

class _VerifyCodeScreenState extends State<VerifyCodeScreen> {
  final TextEditingController _codeController = TextEditingController();
  final AuthService _authService = AuthService();
  String? _resetToken;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Verify Code'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _codeController,
              decoration: InputDecoration(hintText: 'Enter the code sent to your email'),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () async {
                try {
                  await _authService.otpVerification(widget.email, _codeController.text);
                  _resetToken = await _authService.getResetToken();
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => ResetPasswordScreen(
                        resetToken: _resetToken!,
                      ),
                    ),
                  );
                } catch (e) {
                  print('Error verifying code: $e');
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Error verifying code: $e')),
                  );
                }
              },
              child: Text('Verify'),
            ),
          ],
        ),
      ),
    );
  }
}
