

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.IOException;
import java.io.File; 
import java.io.FileWriter;

public class MaxSumaKiekisVid {
	
	public static void main(String[] args) throws Exception {
	   
		String thisLine = null;
		
		double[] skaiciai = new double [ 10000 ];
		int kiekis = 0;
		double suma = 0, vid = 0;	
		
		Padetys padetys = new Padetys();
		
		try {
																												// open input stream test.txt for reading purpose.
			BufferedReader br = new BufferedReader( new FileReader( "duomenys.csv" ) );
			
			System.out.println ( "duomenu failo turinys:" );
						
			while ( ( thisLine = br.readLine() ) != null ) {
			 
				System.out.println( thisLine );
				String[] skaiciu_strs = thisLine.split ( "," );
				
				int poru = ( int ) ( skaiciu_strs .length / 2 )
				
				
				for ( int i=0; i < ( poru * 2 ); i+=2 ) {
				
					padetys.papildyti ( new Padetis ( 
					
						Double.parseDouble (  skaiciu_strs [ i ] )
						, 0
						, Double.parseDouble (  skaiciu_strs [ i  + 1 ] )
					) );
					
					kiekis++;
					//System.out.println( "Rastas skaicius  " + skaiciai [ i ] );
					// is padetys.paiimtiItaji ( i ).getT()
					//     padetys.paiimtiItaji ( i ).getV()
					//     padetys.paiimtiItaji ( i ).setV ( apskaciuotas_greitis )  ?? nesu tikras
				} 
				
			}  
								  
		} catch( IOException e ) {
			
			System.out.println( "Error Encountered getting user input:" + e.getMessage() );
			e.printStackTrace();
		}
						
		System.out.println( "Nuskaityta " + kiekis + " skaiciu." );
			
		if ( kiekis > 0 ) {
		
			double max =  skaiciai [ 0 ];
			
			for ( int i = 0; i<kiekis; i++ ) {
				
				suma += skaiciai [ i ];
			
				if ( max < skaiciai [ i ] ) {
				
					max = skaiciai [ i ]; 
				}
			}
			
			System.out.println ( "Maksimali reiksme skaiciu sekoje: " + max );
			System.out.println ( "Skaiciu suma: " + suma );
			vid = suma / kiekis;
			System.out.println ( "Vidurkis: " + vid );

			System.out.println ( "Skaiciai didesni uz vidurki: " );
			
			double likusiu_suma = 0;
			
			for( int i = 0; i< kiekis; i++) {
			
				if ( skaiciai [ i ] > vid ) {
				
						System.out.print ( skaiciai [ i ] + ", " );
					
				} else {
				
					likusiu_suma += skaiciai [ i ]; 
				}
			}
			
			System.out.println();
			System.out.println( "likusiu skaiciu suma: " + likusiu_suma );
			
		}
	}
}