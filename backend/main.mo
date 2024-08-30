import Bool "mo:base/Bool";

import Hash "mo:base/Hash";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

actor {
  type TaxPayer = {
    tid: Nat;
    firstName: Text;
    lastName: Text;
    address: Text;
  };

  stable var taxPayers : [(Nat, TaxPayer)] = [];
  stable var nextTID : Nat = 1;

  public func createTaxPayer(firstName: Text, lastName: Text, address: Text) : async Result.Result<Nat, Text> {
    let newTaxPayer : TaxPayer = {
      tid = nextTID;
      firstName = firstName;
      lastName = lastName;
      address = address;
    };
    taxPayers := Array.append(taxPayers, [(nextTID, newTaxPayer)]);
    nextTID += 1;
    #ok(newTaxPayer.tid)
  };

  public query func getAllTaxPayers() : async [TaxPayer] {
    Array.map(taxPayers, func(entry: (Nat, TaxPayer)) : TaxPayer { entry.1 })
  };

  public query func getTaxPayerByTID(tid: Nat) : async [TaxPayer] {
    switch (Array.find(taxPayers, func(entry: (Nat, TaxPayer)) : Bool { entry.0 == tid })) {
      case null [];
      case (?(_, taxPayer)) [taxPayer];
    }
  };

  public func updateTaxPayer(tid: Nat, firstName: Text, lastName: Text, address: Text) : async Result.Result<(), Text> {
    let index = Array.indexOf<(Nat, TaxPayer)>((tid, { tid; firstName; lastName; address }), taxPayers, func(a, b) { a.0 == b.0 });
    switch (index) {
      case null #err("TaxPayer not found");
      case (?i) {
        let updatedTaxPayer : TaxPayer = { tid; firstName; lastName; address };
        taxPayers := Array.tabulate<(Nat, TaxPayer)>(taxPayers.size(), func (j) {
          if (j == i) { (tid, updatedTaxPayer) } else { taxPayers[j] }
        });
        #ok()
      };
    }
  };
}
