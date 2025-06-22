# Build info

- **Commit:** $GITHUB_SERVER_URL/$GITHUB_REPOSITORY/commit/$GITHUB_SHA
- **GitHub Actions Job:** $GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID/attempts/$GITHUB_RUN_ATTEMPT

This executable was built and signed automatically by github. While the certificate guarantees it hasn’t been altered since build, and that build is made from a specific commit hash in github context, it doesn’t guarantee the code is free of bugs or vulnerabilities.

```bash
# verify the certificate
cosign verify-blob --certificate ./bin/exportcase.wasm.crt --signature ./bin/exportcase.wasm.sig ./bin/exportcase.wasm
```

```bash
# display the certificate's metadata
cat ./bin/exportcase.wasm.crt | base64 -d | openssl x509 -noout -text
```