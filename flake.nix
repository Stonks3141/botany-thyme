{
  description = "SMathHacks 2024 sustainability project";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  outputs = { self, nixpkgs }: let
    systems = ["aarch64-darwin" "aarch64-linux" "x86_64-darwin" "x86_64-linux"];
    forEachSystem = fn: lib.genAttrs systems (system: fn (import nixpkgs {inherit system;}));
    inherit (nixpkgs) lib;
  in {
    devShells = forEachSystem (pkgs: {
      default = pkgs.mkShell {
        name = "overlay";
        packages = with pkgs; [
          nodePackages.npm
          nodejs_20
        ];
      };
    });
  };
}
