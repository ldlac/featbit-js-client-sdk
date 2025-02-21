{ pkgs, lib, config, inputs, ... }:

{
  packages = [
    pkgs.pnpm_9
    pkgs.nodejs_18
    pkgs.trivy
  ];

  dotenv.disableHint = true;

  enterShell = ''
  '';

  enterTest = ''
  '';
}